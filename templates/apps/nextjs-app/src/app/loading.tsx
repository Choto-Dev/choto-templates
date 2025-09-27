export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-background/60">
      <div className="text-center">
        {/* Loading text with pulse animation */}
        <h2 className="mb-2 animate-pulse font-semibold text-2xl text-muted-foreground">
          Loading
        </h2>

        {/* Animated dots */}
        <div className="flex justify-center space-x-1">
          <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
            style={{ animationDelay: "0.1s" }}
          />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
            style={{ animationDelay: "0.2s" }}
          />
        </div>
      </div>
    </main>
  );
}
