import { Window } from 'happy-dom'
import ogs from 'open-graph-scraper';
import parse, { domToReact } from 'html-react-parser';

const BlogCard = ({ cardData, children }: any) => {
    //内部リンクか外部リンク化判定
    const blank = cardData.url.indexOf(import.meta.env.DOMEIN) === -1;
    const blankProp = blank
        ? {
            target: "_blank",
            rel: "noopener nofollow",
        }
        : {};
    if (cardData.ogTitle) {
        return (
            <a href={cardData.ogUrl} {...blankProp}>
                <div>
                    <img
                        src={cardData.ogImage ? cardData.ogImage.url : "/noimage.png"}
                        alt=""
                    />
                </div>
                <div>
                    <p>{cardData.ogTitle && cardData.ogTitle}</p>
                    <div>
                        <p>
                            {cardData.ogDescription && cardData.ogDescription}
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

export default function BlogContents(content: string) {
    const window = new Window();
    const document = window.document;
    document.body.innerHTML = content;
    const links = document.querySelectorAll('a').map((data) => {
        const url = data.getAttribute('href').indexOf('http') === -1 ? `${import.meta.env.DOMEIN}${data.getAttribute('href')}` : data.getAttribute('href');
        return { url: url }
    });

    let cardDatas: any[] = [];
    const temps: any = [];
    links.map(async (link) => {
        const options = { url: link.url };
        ogs(options).then((data) => {
            const { error, result, response } = data;
            temps.push(result);
        })
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
    }
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
        <main>{parse(content, { replace })}</main>
    );
}