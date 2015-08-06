#!/usr/bin/python

# route 53 dyndns script taken from Taylor Burnhams original post :
# https://www.vnucleus.com/blog/2014/6/15/4-using-amazon-route53-for-dynamic-dns
# modified to perform UPSERT rather than DELETE,CREATE
# modified to use a configuration file /etc/dyndns.config to store config values

import boto
from boto.route53.record import ResourceRecordSets
import urllib2
import ConfigParser
import smtplib
from email.mime.text import MIMEText
import StringIO
import ConfigParser

# Parse config

CONFIG_FILE="/etc/dyndns.config"
config = ConfigParser.RawConfigParser()
config.read(CONFIG_FILE)

# AWS config 

AWS_ACCESS_KEY_ID                 = config.get("config","AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY             = config.get("config","AWS_SECRET_ACCESS_KEY")
AWS_R53_ZONE                      = config.get("config","AWS_R53_ZONE")
AWS_R53_ADDR                      = config.get("config","AWS_R53_ADDR")

# Notifications

SENDING_ADDRESS                   = config.get("config","SENDING_ADDRESS")
RECIPIENT_ADDRESS                 = config.get("config","RECIPIENT_ADDRESS")
SMTP_HOST                         = config.get("config","SMTP_HOST")

ip = urllib2.urlopen('https://api.ipify.org?format=text').read().rstrip()
# Connect to Route53.
r53 = boto.route53.connect_to_region('universal',
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

# Gather record sets.
records = r53.get_all_rrsets(AWS_R53_ZONE,'A',AWS_R53_ADDR,maxitems=1)[0]

# Get the current IP assigned to the record set.
oldip = records.resource_records[0]
if ip in oldip:
        print "%s exists for %s." % (ip, AWS_R53_ADDR)
else:
        print "%s does NOT exist in %s." % (ip, AWS_R53_ADDR)
        print "Current value is %s." % (oldip)
        print "Updating records."
        r53rr = ResourceRecordSets(r53, AWS_R53_ZONE)
        print "Creating updated record."
        c_record = r53rr.add_change("UPSERT", AWS_R53_ADDR,"A", 20)
        c_record.add_value(ip)
        print "Committing changes."
        r53rr.commit()
        print "Records updated with new IP at %s." % (ip)
         
	#send a notification email 
        msg = MIMEText("IP address changed from %s to %s\n" % (oldip,ip))
                 
        msg['Subject'] = 'IP ADDRESS CHANGE - UPDATE GRADWELL'
        msg['From'] = SENDING_ADDRESS
        msg['To'] =   RECIPIENT_ADDRESS
        
        s = smtplib.SMTP(SMTP_HOST)
        s.sendmail(SENDING_ADDRESS, [RECIPIENT_ADDRESS], msg.as_string())
        s.quit()
