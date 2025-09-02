export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="border p-4 rounded-xl shadow-sm flex flex-col gap-3 bg-white">
    {children}
  </div>
);
