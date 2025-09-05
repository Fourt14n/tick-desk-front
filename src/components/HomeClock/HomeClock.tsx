import { useEffect, useState } from "react";

export const Clock: React.FC = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return <p className="text-(--grey) font-bold text-sm md:text-xl lg:text-2xl text-center">{formatter.format(now)}</p>;
};