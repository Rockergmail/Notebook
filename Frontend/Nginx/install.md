```
# ./configure: error: C compiler cc is not found
yum groupinstall "Development Tools"

# the HTTP rewrite module requires the PCRE library.
yum install pcre-devel

cd /usr/local/nginx-*
./configure && make && make install

mkdir /usr/local/nginx/conf/vhosts
touch /usr/local/nginx/conf/vhosts/nginx.pjname.conf
```