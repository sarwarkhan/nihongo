# nihongo
Tools for Japanese Language practice.

# To install dependency run following command:
npm install -d

# Use following command to create mongodb table, before run the app:
mongo
use nihongo;
db.counters.insert({_id: 'current_id', seq: 0});

# Now run the app:
node ./bin/www
