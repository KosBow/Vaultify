type Props = {
  status: "expired" | "soon" | "active";
  text: string;
};

export function StatusBadge({ status, text }: Props) {
  const bg =
    status === "expired"
      ? "#3b0d0d"
      : status === "soon"
      ? "#3b2a0d"
      : "#0d3b1a";

  const color =
    status === "expired"
      ? "#ff6b6b"
      : status === "soon"
      ? "#ffa94d"
      : "#51cf66";

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 999,
        background: bg,
        color,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {text}
    </span>
  );
}
