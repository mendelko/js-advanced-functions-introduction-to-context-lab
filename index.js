function createEmployeeRecord(array){
    let record = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record;
}

function createEmployeeRecords(array){
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, date){
    const updTimeInEvents = {
        type: "TimeIn",
        date: date.slice(0,10),
        hour: parseInt(date.slice(-4))
    }
    employeeRecord.timeInEvents.push(updTimeInEvents);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, date){
    const updTimeOutEvents = {
        type: "TimeOut",
        date: date.slice(0,10),
        hour: parseInt(date.slice(-4))
    }
    employeeRecord.timeOutEvents.push(updTimeOutEvents)
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date){
    let timeInEvent = employeeRecord.timeInEvents.find(function(e){
        if (e.date === date){
            return e.date
        }
    })
    let timeOutEvent = employeeRecord.timeOutEvents.find(function(e){
        if (e.date === date){
            return e.date
        }
    })
    return (timeOutEvent.hour - timeInEvent.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, date){
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    const allWages = employeeRecord.timeInEvents.map((e) => wagesEarnedOnDate(employeeRecord, e.date));
    return allWages.reduce((sum, wage) => sum + wage);
  }

  function calculatePayroll(employeeRecords){
      let payroll = employeeRecords.map((e) => allWagesFor(e))
      return payroll.reduce((sum, wages) => sum + wages)
  }

  function findEmployeeByFirstName(employeeRecord){
      const findEmployee = employeeRecord.find(e => e.firstName)
      return findEmployee
  }