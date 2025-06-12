import { Link } from "react-router-dom";

type Crumb = {
  label: string;
  path: string | null;
};

interface BreadcrumbBarProps {
  trail: Crumb[];
}

const BreadcrumbBar: React.FC<BreadcrumbBarProps> = ({ trail }) => {
  return (
    <div
      style={{
        background: "var(--primary-color)",
        color: "var(--secondary-color)",
        padding: "0.5rem 1rem",
        display: "flex",
        fontSize: "0.9rem",
        gap: "0.5rem",
        flexWrap: "wrap",
      }}
    >
      {trail.map((crumb, idx) => (
        <span key={idx} style={{ display: "flex", alignItems: "center" }}>
          {crumb.path ? (
            <Link
              to={crumb.path}
              style={{
                color: "var(--font-color)",
                textDecoration: "none",
              }}
            >
              {crumb.label}
            </Link>
          ) : (
            <span>{crumb.label}</span>
          )}
          {idx < trail.length - 1 && (
            <span style={{ margin: "0 0.5rem" }}>&gt;</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default BreadcrumbBar;
