import React, {useState} from 'react'
import './remittance.scss'

import TablelistRemit from '../../components/tablelistRemit/tablelistRemit'
import TablelistRemitLog from '../../components/tablelistRemitLog/tablelistRemitLog'

const Remittance = () => {

  const [remit, setRemit] = useState([]);
  const [paymentMode, setPaymentMode] = useState([])
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [outBalance, setOutBalance] = useState(0);
  const [efund, setEfund] = useState(0);
  const [efundDeduct, setEfundDeduct] = useState(0);
  const [pay, setPay] = useState(0);
  const [bank, setBank] = useState("");
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState("");

  const [remitLog, setRemitLog] = useState([]);
  const [editDate, setEditDate] = useState("");
  const [balance, setBalance] = useState(0);

  return (
    <div className='remittance' >
      <TablelistRemit
        remit={remit} setRemit={setRemit}
        firstName={firstName} setFirstName={setFirstName}
        lastName={lastName} setLastName={setLastName}
        outBalance={outBalance} setOutBalance={setOutBalance}
        efund={efund} setEfund={setEfund}
        pay={pay} setPay={setPay}
        bank={bank} setBank={setBank}
        date={date} setDate={setDate}
        paymentMode={paymentMode} setPaymentMode={setPaymentMode}
        efundDeduct={efundDeduct} setEfundDeduct={setEfundDeduct}
        type={type} setType={setType}
         />
      <TablelistRemitLog 
        remitLog={remitLog} setRemitLog={setRemitLog}
        date={date} setDate={setDate}
        editDate={editDate} setEditDate={setEditDate}
        pay={pay} setPay={setPay}
        bank={bank} setBank={setBank}
        balance={balance} setBalance={setBalance}
      />
    </div>
  )
}

export default Remittance