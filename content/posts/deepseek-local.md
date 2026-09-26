---
title: 如何在本地部署Deepseek
date: 2025-01-28T14:48:57+08:00
lastmod: 2025-01-29T01:39:56+08:00
slug: deepseek-local
aliases:
  - /2025/01/28/如何在本地部署Deepseek/
categories:
  - 人工智能
tags:
  - DeepSeek
  - Ollama
---
首先到Ollama[官网](https://ollama.com/download)下载适配自己系统的客户端,然后在搜索栏上搜索Deepseek-r1,
在以下界面可以选择不同的模型，文件大小适配于不同的设备，一般正常的自己用的画可以选择7或8b，如果是轻薄本建议用1.5b。
![图片](https://bu.dusays.com/2025/01/28/6798ad2b9a7af.png)

之后按住键盘上的win+r，输入cmd，回车，在里面输入你选择的模型的指令（在右侧）
随后他就会开始部署，
完成后即可运行。
若需要再次打开，只需再启动cmd界面，随后输入之前的指令就行。(使用前一定要打开Ollama)
![图片](https://bu.dusays.com/2025/01/28/6798ad2b96cdd.png)
接下来是可视化界面
去github上下载一个[Chatbox](https://github.com/Bin-Huang/chatbox/blob/v0.4.5/README-CN.md),打开后这样设置，

![图片](https://bu.dusays.com/2025/01/29/679915dfcb205.png)

就可以再本地运行Deepseek。
