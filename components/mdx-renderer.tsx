import { useMDXComponent } from "next-contentlayer/hooks";

export function MDXRenderer({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code);

  return <MDXContent />;
}
