/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@yarnpkg/plugin-npm-ping",
factory: function (require) {
var plugin=(()=>{var d=Object.create,s=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var h=Object.getOwnPropertyNames;var w=Object.getPrototypeOf,k=Object.prototype.hasOwnProperty;var U=t=>s(t,"__esModule",{value:!0});var p=t=>{if(typeof require!="undefined")return require(t);throw new Error('Dynamic require of "'+t+'" is not supported')};var N=(t,e)=>{for(var r in e)s(t,r,{get:e[r],enumerable:!0})},R=(t,e,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of h(e))!k.call(t,i)&&i!=="default"&&s(t,i,{get:()=>e[i],enumerable:!(r=x(e,i))||r.enumerable});return t},a=t=>R(U(s(t!=null?d(w(t)):{},"default",t&&t.__esModule&&"default"in t?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);var B={};N(B,{default:()=>A});var c=a(p("clipanion")),m=a(p("@yarnpkg/cli")),n=a(p("@yarnpkg/core")),g=a(p("@yarnpkg/plugin-npm")),o=class extends m.BaseCommand{async execute(){let e=await n.Configuration.find(this.context.cwd,this.context.plugins),r=g.npmConfigUtils.getDefaultRegistry({configuration:e});return(await n.StreamReport.start({configuration:e,stdout:this.context.stdout},async f=>{let u;try{u=await g.npmHttpUtils.get("/-/ping",{configuration:e,registry:r,jsonResponse:!0})}catch(y){throw y}f.reportInfo(n.MessageName.UNNAMED,"pong")})).exitCode()}};o.paths=[["npm","ping"]],o.usage=c.Command.Usage({description:"Verify if the registry is online",details:"TBA",examples:[["Triggers a ping to the defined registry in .yamlrc file","yarn npm ping"]]});var l=o;var b={commands:[l]},A=b;return B;})();
return plugin;
}
};
