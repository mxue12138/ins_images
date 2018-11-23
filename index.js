let cheerio = require('cheerio');
let axios = require('axios');
let process = require('child_process');

let option = {
    url: 'https://www.instagram.com/p/Bqc8yqoh7KY/',
    proxy: '127.0.0.1:1086',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
    mode: 0
}

/* mode选项解释：
** 0 为服务器翻墙模式，使用socks协议，使用此模式服务器必须使用socks代理，并且修改proxy选项为你的本地代理地址。
** 1 为服务器直连模式，也就是服务器可以直接连接全球网络。
** 2 或其他数字为客户端模式，也就是只要访问者可以连接全球即可，与服务器无关。
**/

let getImg = (data) => {
    let $ = cheerio.load(data);
    let window = {};
    eval($('script')[3].children[0].data);
    let list = window._sharedData.entry_data.PostPage[0].graphql.shortcode_media.edge_sidecar_to_children.edges;
    let imgArr = [];
    for (let i = 0; i < list.length; i++) {
        imgArr.push(list[i].node.display_resources[2].src);
    }
    return imgArr;
}

if (option.mode == 0) {
    process.exec(`curl --socks5 "${ option.proxy }" --user-agent "${ option.ua }" "${ option.url }"`, (error, stdout, stderr) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log(getImg(stdout));
    });
} else if (option.mode == 1) {

} else {

}
