```
wget https://nodejs.org/dist/v10.15.3/node-v10.15.3-linux-x64.tar.xz
yum install xz -y
xz -d node-v10.14.2-linux-x64.tar.xz
tar -xvf node-v10.14.2-linux-x64.tar

cd /usr/bin
ln -s /usr/local/node-v10.15.3-linux-x64/bin/node /usr/bin/node
ln -s /usr/local/node-v10.15.3-linux-x64/lib/node_modules/npm/bin/npm-cli.js /usr/bin/npm


yum install pcre-devel zlib zlib-devel -y


https://tecadmin.net/install-mysql-5-7-centos-rhel/

https://www.howtoforge.com/tutorial/how-to-install-and-configure-mongodb-on-centos-7/
```