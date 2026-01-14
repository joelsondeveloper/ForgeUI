import { renderNode } from "./renderNode";

export function ForgeUIRenderer({
  document,
  onDocumentChange,
}: any) {
  const onStateChange = (key: string, value: any) => {
    const newDoc = {
      ...document,
      state: {
        ...document.state,
        [key]: value,
      },
    };
    onDocumentChange(newDoc);
  };

  return (
    <>
      <style>
        {`
            html, body, #root {
                margin: 0;
                padding: 0;
                width: 100%;
                min-height: 100%;
                background-color: #27251F;
  }
            .forgeui-renderer-root {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                width: 100%;
                overflow-x: hidden;
                font-family: sans-serif;
            }
            .forgeui-renderer-root *, .forgeui-renderer-root *:before, .forgeui-renderer-root *:after {
                box-sizing: border-box;
            }
             .forgeui-renderer-root img {
                max-width: 100%;
                display: block;
             }`}
      </style>

      <div className="forgeui-renderer-root">
        {renderNode(document.root, document, onStateChange)}
      </div>
    </>
  );
}
