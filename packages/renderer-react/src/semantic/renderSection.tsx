import { renderNode } from "../renderNode"
import { resolveToken } from "../resolveTheme"
import { resolveStyles } from "../resolveStyles"

export function renderSection(node: any, document: any) {

    const theme = document.theme

    const paddindY = node.styles?.layout.padding?.top ?? node.styles?.layout.padding?.bottom ?? "xl"

    const background = node.styles?.visual.backgroundColor ?? "background.surface"

    const maxWidth = node.styles?.layout.maxWidth ?? "1200px"

    return (
        <section style={{
            padding: `${resolveToken(paddindY, theme.spacing)} 0`,
            backgroundColor: resolveToken(background, theme.colors),
        }}>
            <div style={{
                maxWidth,
                margin: "0 auto",
                padding: `0 ${resolveToken("lg", theme.spacing)}`,
            }}>
                {node.children.map((child: any) => renderNode(child, document))}
            </div>
        </section>
    );
}