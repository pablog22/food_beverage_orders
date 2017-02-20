To load test the api I use Apache JMeter 
http://jmeter.apache.org/

Example:
https://www.youtube.com/watch?v=iprQ77q2cwk

Run JMeter
jmeter.bat -n -t AddBeverage.jmx -l AddBeverage.jtl -j AddBeverage.log


Make NodeJS faster:
https://www.quora.com/How-many-requests-per-second-can-a-simple-Node-js-Hello-World-take




Antes y despues de agregar lo de cluster:
=========================================
La idea de la prueba es esta:
Simulate the condition that one thousand users coming within ten seconds, 
and each of them issue 100 requests as fast as possible.

La idea se tomo de aca:
https://medium.com/@tongqingqiu/build-high-performance-restful-api-5fdbbd859b58#.wulyxfixf
Pero ahi el "work" toma 100ms y nosotros tardamos un tiempo mas.

          <stringProp name="LoopController.loops">100</stringProp>
        
        <stringProp name="ThreadGroup.num_threads">1000</stringProp>
        <stringProp name="ThreadGroup.ramp_time">10</stringProp>

////////////////////////////////////////////////////////////////////////////
Antes de hacer lo de los cluster

C:\dev\apache-jmeter-3.1\bin\my-tests>jmeter.bat -n -t AddBeverage.jmx -l AddBeverage.jtl -j AddBeverage.log
Writing log file to: C:\dev\apache-jmeter-3.1\bin\my-tests\AddBeverage.log
Creating summariser <summary>
Created the tree successfully using AddBeverage.jmx
Starting the test @ Sun Feb 19 22:13:25 ART 2017 (1487553205520)
Waiting for possible Shutdown/StopTestNow/Heapdump message on port 4445
summary +   5834 in 00:00:04 = 1302.2/s Avg:   147 Min:     6 Max:   409 Err:     0 (0.00%) Active: 431 Started: 431 Finished: 0
summary +  65987 in 00:00:30 = 2203.5/s Avg:   412 Min:    25 Max:  3158 Err:  2870 (4.35%) Active: 869 Started: 1000 Finished: 131
summary =  71821 in 00:00:34 = 2086.2/s Avg:   391 Min:     6 Max:  3158 Err:  2870 (4.00%)
summary +  28179 in 00:00:12 = 2319.6/s Avg:   269 Min:     1 Max:  3043 Err:   300 (1.06%) Active: 0 Started: 1000 Finished: 1000
summary = 100000 in 00:00:47 = 2147.1/s Avg:   357 Min:     1 Max:  3158 Err:  3170 (3.17%)
Tidying up ...    @ Sun Feb 19 22:14:12 ART 2017 (1487553252149)
... end of run

////////////////////////////////////////////////////////////////////////////
Despues de hacer lo de los cluster

C:\dev\apache-jmeter-3.1\bin\my-tests>jmeter.bat -n -t AddBeverage.jmx -l AddBeverage.jtl -j AddBeverage.log
Writing log file to: C:\dev\apache-jmeter-3.1\bin\my-tests\AddBeverage.log
Creating summariser <summary>
Created the tree successfully using AddBeverage.jmx
Starting the test @ Sun Feb 19 22:43:34 ART 2017 (1487555014585)
Waiting for possible Shutdown/StopTestNow/Heapdump message on port 4445
summary +      1 in 00:00:01 =    1.8/s Avg:   128 Min:   128 Max:   128 Err:     0 (0.00%) Active: 44 Started: 44 Finished: 0
summary +  72607 in 00:00:25 = 2925.2/s Avg:   242 Min:     0 Max:  4410 Err:  2773 (3.82%) Active: 666 Started: 1000 Finished: 334
summary =  72608 in 00:00:25 = 2862.5/s Avg:   242 Min:     0 Max:  4410 Err:  2773 (3.82%)
summary +  27392 in 00:00:07 = 3761.6/s Avg:   130 Min:     0 Max:  3683 Err:    77 (0.28%) Active: 0 Started: 1000 Finished: 1000
summary = 100000 in 00:00:33 = 3063.0/s Avg:   211 Min:     0 Max:  4410 Err:  2850 (2.85%)
Tidying up ...    @ Sun Feb 19 22:44:07 ART 2017 (1487555047286)

////////////////////////////////////////////////////////////////////////////
Se cambio la forma de llamar a las collections:
var bevcoll = db.collection('beverages')            => db.collection('beverages')
var ordercoll = db.collection('beverages_orders');  => db.collection('beverages_orders')

C:\dev\ws\food_beverage_orders\loadtest>jmeter.bat -n -t AddBeverage.jmx -l AddBeverage.jtl -j AddBeverage.log
Writing log file to: C:\dev\ws\food_beverage_orders\loadtest\AddBeverage.log
Creating summariser <summary>
Created the tree successfully using AddBeverage.jmx
Starting the test @ Mon Feb 20 09:46:14 ART 2017 (1487594774836)
Waiting for possible Shutdown/StopTestNow/Heapdump message on port 4445
summary +  35827 in 00:00:15 = 2372.2/s Avg:   236 Min:     0 Max:  4316 Err:  1238 (3.46%) Active: 929 Started: 1000 Finished: 71
summary +  64173 in 00:00:17 = 3694.5/s Avg:   181 Min:     0 Max:  3930 Err:  1621 (2.53%) Active: 0 Started: 1000 Finished: 1000
summary = 100000 in 00:00:32 = 3079.4/s Avg:   201 Min:     0 Max:  4316 Err:  2859 (2.86%)
Tidying up ...    @ Mon Feb 20 09:46:47 ART 2017 (1487594807371)
... end of run

NO HUBO CAMBIOS CON LO ANTERIOR


////////////////////////////////////////////////////////////////////////////
Utilizamos restify en ves de express:

C:\dev\ws\food_beverage_orders\loadtest>jmeter.bat -n -t AddBeverage.jmx -l AddBeverage.jtl -j AddBeverage.log
Writing log file to: C:\dev\ws\food_beverage_orders\loadtest\AddBeverage.log
Creating summariser <summary>
Created the tree successfully using AddBeverage.jmx
Starting the test @ Mon Feb 20 10:20:38 ART 2017 (1487596838141)
Waiting for possible Shutdown/StopTestNow/Heapdump message on port 4445
summary +  64898 in 00:00:22 = 2976.8/s Avg:   218 Min:     0 Max:  4148 Err:  1744 (2.69%) Active: 755 Started: 1000 Finished: 245
summary +  35102 in 00:00:08 = 4143.8/s Avg:   134 Min:     0 Max:  3416 Err:   175 (0.50%) Active: 0 Started: 1000 Finished: 1000
summary = 100000 in 00:00:30 = 3303.4/s Avg:   189 Min:     0 Max:  4148 Err:  1919 (1.92%)
Tidying up ...    @ Mon Feb 20 10:21:08 ART 2017 (1487596868475)
... end of run

FUNCIONA UN POCO MEJOR