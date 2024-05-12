export default function NoResults({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-full w-full py-10">
      <h1 className="text-xl text-center text-muted-foreground">
        {message ? message : "No results found"}
      </h1>
    </div>
  );
}
