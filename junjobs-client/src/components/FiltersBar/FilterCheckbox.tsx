const CheckboxFilter = ({label, onChange, isChecked, disabled, isHidden }: any) => {
  return (isHidden ? 
    null 
    :
    <div className={`d-flex form-check form-check-inline text-center me-0`}>
        <label className="form-check-label me-auto" >{label}</label>
        <input disabled={disabled} className="form-check-input ms-2" type="checkbox" id={label} onChange={onChange} checked={isChecked}/>
    </div>)
}

export default CheckboxFilter;