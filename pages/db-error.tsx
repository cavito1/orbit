import { useEffect } from "react";
import Router from "next/router";

export default function DatabaseErrorPage() {
  const isDbConfigured = process.env.NEXT_PUBLIC_DATABASE_CHECK === "true";

  useEffect(() => {
    if (isDbConfigured) {
      Router.replace("/"); // Redirect back to homepage
    }
  }, [isDbConfigured]);

  const containerStyle: React.CSSProperties = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(240,240,245,1) 100%)",
    color: "#111",
    textAlign: "center",
    padding: "0 20px",
  };

  const boxStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.4)",
    borderRadius: "16px",
    padding: "40px 60px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    maxWidth: "480px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "1.8rem",
    fontWeight: 700,
    color: "#ef4444",
    marginBottom: "12px",
  };

  const textStyle: React.CSSProperties = {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#374151",
  };

  const codeStyle: React.CSSProperties = {
    backgroundColor: "#f3f4f6",
    borderRadius: "6px",
    padding: "2px 6px",
    fontFamily: "SFMono-Regular, Menlo, monospace",
    fontSize: "0.9rem",
  };

  const footerStyle: React.CSSProperties = {
    marginTop: "20px",
    fontSize: "0.9rem",
    color: "#6b7280",
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1 style={titleStyle}>Database Not Configured</h1>
        <p style={textStyle}>
          Please set the{" "}
          <code style={codeStyle}>DATABASE_URL</code> environment variable in
          your deployment.
        </p>
        <p style={footerStyle}>Your application cannot start without it.</p>
      </div>
    </div>
  );
}