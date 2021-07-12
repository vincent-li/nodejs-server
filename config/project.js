// 示例demo，前端的资源上传到cdn，然后以配置文件的方式注入到服务中
const cdn = 'https://cdn.izelas.run'

// makefuture.run 界面
const platform_timestemp = 'T202107071057'
// h5编辑器的代码
const makeh5_timestemp = 'T202011111520'

module.exports = {
  makefuture: {
    title: '码客·未来',
    jses: [`${cdn}/makefuture/pages/platform/${platform_timestemp}/main.js`],
    css: [`${cdn}/makefuture/pages/platform/${platform_timestemp}/main.css`],
  },
  makeh5: {
    title: '码客·未来',
    jses: [
      `${cdn}/vendors/jquery@3.5.0/jquery-3.5.0.min.js`,
      `${cdn}/vendors/react@16.8.4/react.min.js`,
      `${cdn}/vendors/react@16.8.4/react-dom.min.js`,
      `${cdn}/makefuture/pages/makeh5/${makeh5_timestemp}/workbench.js`,
    ],
    css: [`${cdn}/makefuture/pages/makeh5/${makeh5_timestemp}/workbench.css`],
  },
}
