---
title: 《MySQL必知必会》总结
date: 2025-09-22T20:24:27+08:00
lastmod: 2025-09-22T21:32:51+08:00
slug: mysql-notes
categories:
  - 编程
tags:
  - MySQL
  - 数据库
---

  周一不想听课，一天使时间看完《MySQL必知必会》之北雷村最速传说。
  你说的对，但是MySQL 是最流行的关系型数据库管理系统，在 WEB 应用方面 MySQL 是最好的 RDBMS(Relational Database Management System：关系数据库管理系统)应用软件之一。 

  To start with:
  创建数据库:

  ```sql
  CREATE DATABASE 数据库名;
  ```
  删除数据库
  ```sql
  DROP DATABASE <database_name>;        -- 直接删除数据库，不检查是否存在
  OR
  DROP DATABASE [IF EXISTS] <database_name>;
  ```
  创建数据库过后需要用USE关键字手动选择所用的数据库：
  ```sql
  USE database_name;
  ```

  接下来就是创建数据表，MySQL的语句一般都是对表中数据进行CURD。

```sql
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    ...
);
    table_name 是你要创建的表的名称。
    column1, column2, ... 是表中的列名。
    datatype 是每个列的数据类型。
例如：
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    birthdate DATE,
    is_active BOOLEAN DEFAULT TRUE
);
删除数据表：
-- 删除表，如果存在的话
DROP TABLE IF EXISTS table_name;

-- 直接删除表，不检查是否存在
DROP TABLE table_name;
清除数据但是保留表结构：
TRUNCATE TABLE table_name;
```

查询数据方法：

```sql
SELECT column1, column2, ...
FROM table_name
[WHERE condition]
[ORDER BY column_name [ASC | DESC]]
[LIMIT number];
最简单的一句： SELECT * FROM table_name;
WHERE 子句用于在 MySQL 中过滤查询结果，只返回满足特定条件的行。
ORDER规定排列为升序（ASC）或降序（DESC）
LIMIT则可用于分页查询
在 SELECT 语句后加上 DISTINCT 则可对查询结果去重，且 DISTINCT 不能被部分使用，会作用于所有列。
```

WHERE子句用法：

```sql
 1. 等于条件：
SELECT * FROM users WHERE username = 'test';
2. 不等于条件：
SELECT * FROM users WHERE username != 'runoob';
3. 大于条件:
SELECT * FROM products WHERE price > 50.00;
4. 小于条件:
SELECT * FROM orders WHERE order_date < '2023-01-01';
5. 大于等于条件:
SELECT * FROM employees WHERE salary >= 50000;
6. 小于等于条件:
SELECT * FROM students WHERE age <= 21;
7. 组合条件（AND、OR）:
SELECT * FROM products WHERE category = 'Electronics' AND price > 100.00;
SELECT * FROM orders WHERE order_date >= '2023-01-01' OR total_amount > 1000.00;
8. 模糊匹配条件（LIKE）:
SELECT * FROM customers WHERE first_name LIKE 'J%';
(“%”通配符表示匹配任意个字符，“—”表示匹单个字符)
9. IN 条件:
SELECT * FROM countries WHERE country_code IN ('US', 'CA', 'MX');
10. NOT 条件:
SELECT * FROM products WHERE NOT category = 'Clothing';
11. BETWEEN 条件:
SELECT * FROM orders WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31';
12. IS NULL 条件
SELECT * FROM employees WHERE department IS NULL;
13. IS NOT NULL 条件:
SELECT * FROM customers WHERE email IS NOT NULL;
```

对于LIMIT：

```sql
LIMIT 5 会输出前五行，
若想得到下一个5行，则需要指定检索开始行和行数： 
LIMIT 5，5（显示6-10行）
LIMIT检索的第一行是行0，所以 LIMIT 1，1 返回的是第二行。
另一种表示方法：
LIMIT OFFSET,比如 LIMIT 3 OFFSET 4 代表从第四行开始取三行。 
```

WHERE过滤条件的正则表达式：

```sql
REGEXP 用于检查一个字符串是否匹配指定的正则表达式模式:
SELECT column1, column2, ...
FROM table_name
WHERE column_name REGEXP 'pattern';

.：匹配任意单个字符。
^：匹配字符串的开始。
$：匹配字符串的结束。
*：匹配零个或多个前面的元素。
+：匹配一个或多个前面的元素。
?：匹配零个或一个前面的元素。
[abc]：匹配字符集中的任意一个字符。
[^abc]：匹配除了字符集中的任意一个字符以外的字符。
[a-z]：匹配范围内的任意一个小写字母。
[0-9]：匹配一个数字字符。
\w：匹配一个字母数字字符（包括下划线）。
\s：匹配一个空白字符。
实例：
查找 name 字段中以 'st' 为开头的所有数据：
mysql> SELECT name FROM person_tbl WHERE name REGEXP '^st';
查找 name 字段中以 'ok' 为结尾的所有数据：
mysql> SELECT name FROM person_tbl WHERE name REGEXP 'ok$';
查找 name 字段中包含 'mar' 字符串的所有数据：
mysql> SELECT name FROM person_tbl WHERE name REGEXP 'mar';
查找 name 字段中以元音字符开头或以 'ok' 字符串结尾的所有数据：
mysql> SELECT name FROM person_tbl WHERE name REGEXP '^[aeiou]|ok$';
选择订单表中描述中包含 "item" 后跟一个或多个数字的记录。
SELECT * FROM orders WHERE order_description REGEXP 'item[0-9]+';
使用 BINARY 关键字，使得匹配区分大小写：
SELECT * FROM products WHERE product_name REGEXP BINARY 'apple';
使用 OR 进行多个匹配条件，以下将选择姓氏为 "Smith" 或 "Johnson" 的员工记录：
SELECT * FROM employees WHERE last_name REGEXP 'Smith|Johnson';
```



MySQL中也有许多函数，详见[菜鸟教程](https://www.runoob.com/mysql/mysql-functions.html)。

关于聚合函数(将一列数据作为一个整体，进行纵向计算）：

```sql
count() 统计数量
max() 最大值
min() 最小值
avg() 平均值
sum() 求和
语法:SELECT 聚合函数(字段列表) FROM 表名 ;
实例：
select count(*) from emp; -- 统计的是总记录数
select count(idcard) from emp; -- 统计的是idcard字段不为null的记录数
```

GROUP BY分组查询

```sql
语法:
SELECT 字段列表 FROM 表名 [ WHERE 条件 ] GROUP BY 分组字段名 [ HAVING 分组
后过滤条件 ];
实例:
1. 根据性别分组 , 统计男性员工 和 女性员工的数量
select gender, count(*) from emp group by gender ;
2. 根据性别分组 , 统计男性员工 和 女性员工的平均年龄
select gender, avg(age) from emp group by gender 
3.查询年龄小于45的员工 , 并根据工作地址分组 , 获取员工数量大于等于3的工作地址
select workaddress, count(*) address_count from emp where age < 45 group by
workaddress having address_count >= 3;
```
