// components/Header.tsx
type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="site-header">
      <h1>{title}</h1>
    </header>
  );
}