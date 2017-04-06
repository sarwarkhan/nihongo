# nihongo
Tools for Japanese Language practice.

To install dependency run following command: <br/>
> npm install -d

Use following command to create required mongodb table, before run the app: <br/>
> mongo <br/>
> use nihongo; <br/> 
> db.counters.insert({_id: 'current_id', seq: 0}); <br/>

Now run the app: <br/>
>node ./bin/www
