/**
 * <Label> — the single voice for all "metadata" text: kickers, section
 * titles, tags, eyebrows, captions, stat labels. JetBrains Mono, uppercase,
 * 12px / 0.12em (the `label` type token), muted by default.
 *
 * Props:
 *   as     — element to render (default 'span'); use 'p', 'h3', etc.
 *   accent — render in the orange accent colour instead of muted
 *   className / ...rest — forwarded (extra spacing, hover states, etc.)
 */
export default function Label({
  as: Tag = 'span',
  accent = false,
  className = '',
  children,
  ...rest
}) {
  return (
    <Tag
      className={`font-mono text-label uppercase ${accent ? 'text-orange' : 'text-muted'} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
