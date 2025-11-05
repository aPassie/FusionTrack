const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">401</h1>
        <p className="text-xl text-muted-foreground">Unauthorized Access</p>
      </div>
    </div>
  );
};

export default Unauthorized;
