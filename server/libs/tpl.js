'use strict'

const ejs = require('ejs')
const heredoc = require('heredoc')

let tpl = heredoc(function(){/*
  <xml>
  <ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
  <FromUserName><![CDATA[<%= fromUserName %>]]></FromUserName>
  <CreateTime><%= createTime %></CreateTime>
  <MsgType><![CDATA[<%= msgType %>]]></MsgType>
  <% if(msgType === 'text') { %>
    <Content><![CDATA[<%= content %>]]></Content>
  <% } %>
  </xml>
*/})

exports.compiled = ejs.compile(tpl)