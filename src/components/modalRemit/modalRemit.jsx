import React, {useCallback, useEffect} from 'react'
import './modalRemit.scss'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { increment, onSnapshot, query,} from 'firebase/firestore'
import commSellerDataService from '../../services/firebase.services'
import paymentModeDataService, { paymentModeCollectionRef } from '../../services/paymentMode.services';

const ModalRemit = ({
            toggle,
            close,
            submit,
            firstName, setFirstName,
            lastName, setLastName,
            outBalance, setOutBalance,
            efund, setEfund,
            pay, setPay,
            bank, setBank,
            date, setDate,
            paymentMode, setPaymentMode,
            efundDeduct, setEfundDeduct,
            id,
            }) => {

const handlePopulate = useCallback(
  async () => {
    try {
      const sellerSnap = await commSellerDataService.getAllCommSeller(id);
      
      setFirstName(sellerSnap.data().fname);
      setLastName(sellerSnap.data().lname);
      setOutBalance(sellerSnap.data().outBalance);
      setEfund(sellerSnap.data().efund);
      
    } catch (err) {
      alert(err.message)
    }
  }, [id, setFirstName, setLastName, setOutBalance, setEfund, ]
)

const handlePaymentModeSnap = useCallback(
  async () => {
    try {
      const q = query(paymentModeCollectionRef);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let paymentModeArr = [];
        querySnapshot.forEach((doc) => {
          setBank(doc.id)
          paymentModeArr.push({...doc.data(), id: doc.id});
        });
        setPaymentMode(paymentModeArr)
      });
      return () => unsubscribe();
    } catch (err) {
      alert(err.message)
    }
  }, [setPaymentMode, setBank]
);

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const paymentModeSnap = await paymentModeDataService.getAllPaymentMode(bank)
    await paymentModeDataService.addPaymentMode({
      seller: (`${firstName} ${lastName}`),
      outBalance: outBalance,
      totalEfund: efund,
      remit: pay,
      efundDeduct: efundDeduct,
      paymentMode: paymentModeSnap.data().paymentMode,
      date: date
    });
    
    await commSellerDataService.updateCommSeller(id, {
      outBalance: increment( - (pay + efundDeduct)),
      efund: increment(-efundDeduct)
    })
  } catch (err) {
    alert("Remittance Successful")
    e.target.reset();
    submit();
  }
}

useEffect(() => {
  if (id !== undefined && id !== "") {
    handlePopulate();
    handlePaymentModeSnap();
  }
}, [id, handlePopulate, handlePaymentModeSnap]);

  return (
    <div className={`modalAdd-container ${toggle ? `active` : ""}`}>
      <form className='modalAdd-form' onSubmit={handleSubmit}>
        <div className='modalAdd-close' onClick={close}/>
          <div className='inputmodalAdd-container'>

            <label className='inputmodalAdd'>
              Name: {`${firstName} ${lastName}`}
            </label>

            <label className='inputmodalAdd'>
              Balance: {outBalance}
            </label>

            <label className='inputmodalAdd'>
              Efund: {efund}
            </label>

            <label className='inputmodalAdd'>
              Efund deduction:{" "}
              <input onChange={(e) => {setEfundDeduct(e.target.value)}}/>
            </label>

            <label className='inputmodalAdd'>
              Remittance:{" "}
              <input onChange={(e) => {setPay(e.target.value)}}/>
            </label>

            <label className='inputmodalAdd'>
              Mode of Payment:{" "}
              <select value={bank} onChange={(e) => setBank(e.target.value)}>
                {paymentMode.map((payment) => (
                  <option key={payment.id} value={payment.id}>
                      {payment.paymentMode}
                  </option>
                ))}
              </select>
            </label>

            <label className='inputmodalAdd'>
              Date of Payment:{" "}
              <DatePicker 
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="MM/dd/yyyy"
              />
            </label>

          </div>
            <div className='modalAdd-buttons'>
              <button className='modalAdd-but' type='submit'>Enter</button>
              <button className='modalAdd-but' onClick={close}>Cancel</button>
            </div>
      </form>
    </div>                   
  )
}

export default ModalRemit