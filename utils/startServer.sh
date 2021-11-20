sudo service apache2 start
sudo nohup python3 -u ../backend/test.py > serverlog.out 2>&1 & disown
