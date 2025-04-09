import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { executeQuery } from "@/lib/db";

interface CredentialsPayload {
  email: string;
  password: string;
}

interface UserRecord {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string | null;
}

interface DbResult {
  insertId?: number;
}

// Hàm xác thực thông tin đăng nhập
async function verifyCredentials({ email, password }: CredentialsPayload) {
  try {
    // Tìm người dùng theo email
    const users = await executeQuery<UserRecord[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (!users || users.length === 0) {
      return null;
    }

    const user = users[0];

    // So sánh mật khẩu
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return null;
    }

    // Trả về thông tin người dùng (không bao gồm mật khẩu)
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
    };
  } catch (error) {
    console.error("Lỗi xác thực:", error);
    return null;
  }
}

// Cấu hình NextAuth
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
    newUser: "/auth/register",
  },
  secret: process.env.NEXTAUTH_SECRET || "docshare-secret-key-development",
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Chuyển hướng đến trang đăng nhập
      } else if (isLoggedIn && nextUrl.pathname === "/auth/login") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Khi người dùng đăng nhập lần đầu
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      
      // Nếu đăng nhập qua Google và chưa có tài khoản
      if (account && account.provider === "google" && token.email) {
        try {
          // Kiểm tra xem người dùng đã tồn tại chưa
          const users = await executeQuery<UserRecord[]>(
            "SELECT * FROM users WHERE email = ?",
            [token.email]
          );
          
          if (!users || users.length === 0) {
            // Tạo người dùng mới từ tài khoản Google
            const result = await executeQuery<DbResult>(
              "INSERT INTO users (name, email, image) VALUES (?, ?, ?)",
              [token.name, token.email, token.picture]
            );
            
            if (result.insertId) {
              token.id = result.insertId.toString();
            }
          } else {
            token.id = users[0].id.toString();
          }
        } catch (error) {
          console.error("Lỗi xử lý tài khoản Google:", error);
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
      }
      return session;
    }
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mật khẩu", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        return await verifyCredentials({
          email: credentials.email as string,
          password: credentials.password as string
        });
      }
    })
  ],
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
