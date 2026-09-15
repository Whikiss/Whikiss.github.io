---
title: java小游戏
date: 2025-01-24T22:21:07+08:00
lastmod: 2025-01-24T23:45:59+08:00
slug: java-puzzle
categories:
  - 编程
tags:
  - Java
  - Swing
description: 用java写的拼图小游戏
---

## 用java写的拼图小游戏
使用工具-Idea。
一个素材包，一个装主程序的包
主程序就一个本体（GameFrame）和一个测试类(Test)
下面是GameFrame的代码：

~~~java
package UI;

import javax.swing.*;
import javax.swing.border.BevelBorder;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.util.Random;

public class GameFrame extends JFrame implements KeyListener, ActionListener {
    int cnt = 0;
    int x= 0;
    int y = 0;
    int[][] arr2 = new int[4][4];
    int[][]win = new int[][]{
        {1,2,3,4},
        {5,6,7,8},
        {9,10,11,12},
        {13,14,15,0}
    };
    JMenuItem replayItem = new JMenuItem("重新游戏");
    JMenuItem reloginItem = new JMenuItem("重新登陆");
    JMenuItem closeItem = new JMenuItem("关闭游戏");

    JMenuItem accountItem = new JMenuItem("联系方式");

    JMenuItem adapt = new JMenuItem("投喂");

    String path = "..\\picture_Game\\src\\image\\images\\";



    public GameFrame() {
        //初始化界面
        initFrame();
        //初始化菜单
        initJMenubar();

        initDate();
        //初始化图片
        initImage();


        this.setVisible(true);

    }

    private void initImage() {
        this.getContentPane().removeAll();
        if(victor()){
            JLabel winlabel = new JLabel(new ImageIcon("..\\picture_Game\\src\\image\\win.png"));
            winlabel.setBounds(203, 283, 197, 73);
            this.getContentPane().add(winlabel);
        }
        JLabel stepcnt = new JLabel("步数：" + cnt);
        stepcnt.setBounds(50, 30, 100, 20);
        this.getContentPane().add(stepcnt);
        


        for(int i = 0;i < 4;i++){
            for(int j = 0;j < 4;j++){
                ImageIcon icon = new ImageIcon(path+arr2[i][j] +".jpg");
                JLabel label = new JLabel(icon);
                label.setBounds(j * 105+83, i * 105+134, icon.getIconWidth(), icon.getIconHeight());
                label.setBorder(new BevelBorder(0));
                this.getContentPane().add(label);

            }
        }
        ImageIcon background = new ImageIcon("..\\picture_Game\\src\\image\\background.png");
        JLabel backgroundLabel = new JLabel(background);
        backgroundLabel.setBounds(40, 40, 508, 560);
        this.getContentPane().add(backgroundLabel);

        this.getContentPane().repaint();
    }

    private void initDate() {
        Random rand = new Random();
        int[] arr = new int[16];
        for (int i = 0; i < 16; i++) {
            arr[i] = rand.nextInt(16);
            for(int k  = 0;k < i;k++){
                if(arr[k] == arr[i]){
                    i--;
                }
            }
        }

        int k = 0;
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                arr2[i][j] = arr[k];
                k++;
            }
        }
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                if(arr2[i][j] == 0){
                    x = j;
                    y = i;
                }
            }
        }

    }

    private void initJMenubar() {
        JMenuBar menuBar = new JMenuBar();
        JMenu function = new JMenu("功能");
        JMenu aboutJMenu = new JMenu("关于开发者");
        JMenu help = new JMenu("投喂");


        function.add(replayItem);
        function.add(reloginItem);
        function.add(closeItem);

        aboutJMenu.add(accountItem);
        //绑定事件
        replayItem.addActionListener(this);
        reloginItem.addActionListener(this);
        closeItem.addActionListener(this);
        accountItem.addActionListener(this);


        help.add(adapt);

        menuBar.add(function);
        menuBar.add(aboutJMenu);
        menuBar.add(help);

        this.setJMenuBar(menuBar);
    }

    private void initFrame() {
        this.setSize(603,700);
        this.setTitle("拼图游戏");
        this.setAlwaysOnTop(true);
        this.setLocationRelativeTo(null);
        this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        setLayout(null);
        this.addKeyListener(this);
    }

    @Override
    public void keyTyped(KeyEvent e) {

    }

    @Override
    public void keyPressed(KeyEvent e) {
        int code = e.getKeyCode();
        if(code == 88){
            this.getContentPane().removeAll();
            JLabel whole = new JLabel(new ImageIcon(path + "all.png"));


            whole.setBounds(83, 134, 420, 420);
            this.getContentPane().add(whole);
            ImageIcon background = new ImageIcon("..\\picture_Game\\src\\image\\background.png");
            JLabel backgroundLabel = new JLabel(background);
            backgroundLabel.setBounds(40, 40, 508, 560);
            this.getContentPane().add(backgroundLabel);

            this.getContentPane().repaint();

        }
    }

    @Override
    public void keyReleased(KeyEvent e) {
        if(victor()){
            return;
        }

        int code = e.getKeyCode();

        if(code == 37||code ==65){
            if(x == 3){
                return;
            }
            System.out.println("left");

            arr2[y][x] = arr2[y][x+1];
            arr2[y][x+1] = 0;
            x++;
            initImage();
            cnt++;
        }
        else if(code == 38||code == 87){
            if(y == 3){
                return;
            }
            System.out.println("up");
            arr2[y][x] = arr2[y+1][x];
            arr2[y+1][x] = 0;
            y++;
            initImage();
            cnt++;
        }
        else if(code == 39||code == 68){
            if(x == 0){
                return;
            }
            System.out.println("right");

            arr2[y][x] = arr2[y][x-1];
            arr2[y][x-1] = 0;
            x--;
            initImage();
            cnt++;
        }
        else if(code == 40||code == 83){

            if(y == 0){
                return;
            }
            System.out.println("down");
            arr2[y][x] = arr2[y-1][x];
            arr2[y-1][x] = 0;
            y--;
            initImage();
            cnt++;
        }
        else if(code == 88){
            initImage();
        }
        else if(code == 89){
            arr2 = new int[][]{
                    {1,2,3,4},
                    {5,6,7,8},
                    {9,10,11,12},
                    {13,14,15,0}
            };
            initImage();
        }
        /*else{
            System.out.println(code);
        }*/

    }
    public boolean victor(){
        for(int i = 0;i < 4;i++){
            for(int j = 0;j < 4;j++){
                if(arr2[i][j] != win[i][j]){
                    return false;
                }
            }
        }
        return true;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
            Object source = e.getSource();
            if(source == replayItem){
                cnt = 0;
                System.out.println("重新游戏");
                initDate();
                initImage();

            }
            else if(source == reloginItem){
                System.out.println("login");
            }
            else if(source == closeItem){
                System.out.println("close");
                System.exit(0);
            }
            else if(source == accountItem){
                System.out.println("accout");
                JDialog log = new JDialog();
                JLabel label = new JLabel(new ImageIcon("..\\picture_Game\\src\\image\\about.jpg"));
                label.setBounds(0, 0, 258, 258);
                log.getContentPane().add(label);
                log.setSize(344,344);
                log.setAlwaysOnTop(true);
                log.setLocationRelativeTo(null);
                log.setModal(true);
                log.setVisible(true);
            }
    }
}

~~~

由于使用Idea写的，所以大部分时间都是一路tab(。

下面是App:

~~~java
import UI.GameFrame;
import UI.LoginFrame;
import UI.RegisterFrame;

public class App {
    public static void main(String[] args) {
        //new LoginFrame();
        new GameFrame();
        //new RegisterFrame();
    }
}

~~~

因为是在本地运行，所以里面的注册和登录模块我都没写（其实是懒）。

[整个项目文件](https://wweo.lanzouu.com/ibPRk2lw02pi)
里面的图片是我在素晴日后日谈里选的。
