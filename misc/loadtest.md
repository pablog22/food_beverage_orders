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