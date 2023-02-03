import { Window } from 'happy-dom'
import { unfurl } from 'unfurl.js';
import parse, { domToReact } from 'html-react-parser';

const BlogCard = ({ cardData, children }: any) => {
  //内部リンクか外部リンク判定
  const blank = cardData.url.indexOf("astro-test-b4j.pages.dev") === -1;
  const blankProp = blank ?
    {
      target: "_blank",
      rel: "noopener nofollow",
    } :
    {};
  if (cardData.open_graph.title) {
    return (
      <a href={cardData.open_graph.url} {...blankProp}>
                <div>
                    <img
                        src={cardData.open_graph.images.url}
                        alt=""
                    />
                </div>
                <div>
                    <p>{cardData.open_graph.title && cardData.open_graph.title}</p>
                    <div>
                        <p>
                            {cardData.open_graph.description && cardData.open_graph.description}
                        </p>
                    </div>
                </div>
            </a>
    );
  }
  return (
    <a href={cardData.ogUrl} {...blankProp}>
            {children}
        </a>
  );
};

export default function BlogContents(content) {
  content=JSON.stringify(content);
  //const window = new Window();
  //const document = window.document;
  //document.body.innerHTML = content;
  /*const links = document.querySelectorAll('a').map((data) => {
    const url = data.getAttribute('href').indexOf('http') === -1 ? `${"astro-test-b4j.pages.dev"}${data.getAttribute('href')}` : data.getAttribute('href');
    return { url: url }
  });

  let cardDatas: any[] = [];
  const temps: any = [];
  links.map((url) => {
    async () => {
      result = await unfurl(url);
      temps.push(result);
    }
  })

  cardDatas = temps.filter((temp: any) => temp !== undefined);
  //replaceオプションに渡す関数
  const replace = (node: any) => {
    const cardLinks = cardDatas.map((data: any) => data.ogUrl);

    function link(text: any) {
      return text.indexOf(node.attribs?.href) != -1;
    }
    if (node.name === "a" && //タグがa
      node.parent?.children.length === 1 //他に並列で要素を持っていない
    ) {
      //取得したノードのhrefの情報とcardDatasのurlと一致しているオブジェクトをコンポーネントに渡す
      const indexOfUrl = cardDatas.findIndex((obj: any) => {
        return obj.url.indexOf(node.attribs?.href) != -1;
      });
      return (
        <BlogCard cardData={cardDatas[indexOfUrl]}>
                    {domToReact(node.children)}
                </BlogCard>
      );
    }
    return null;
  }*/
  // async function replace(node: any) {
  //     const cardLinks = cardDatas.map((data: any) => data.ogUrl);
  //     function link(text: any) {
  //         return text.indexOf(node.attribs?.href) != -1;
  //     }
  //     if (node.name === "a" && //タグがa
  //         node.parent?.children.length === 1 //他に並列で要素を持っていない
  //     ) {
  //         //取得したノードのhrefの情報とcardDatasのurlと一致しているオブジェクトをコンポーネントに渡す
  //         const indexOfUrl = cardDatas.findIndex((obj: any) => {
  //             return obj.url.indexOf(node.attribs?.href) != -1;
  //         });
  //         return (
  //             <BlogCard cardData={cardDatas[indexOfUrl]}>
  //                 {domToReact(node.children)}
  //             </BlogCard>
  //         );
  //     }
  //     return null;
  // }

  return (
    <>
    <main>{content}</main>
    <main>{typeof(content)}</main>
    </>
  );
}