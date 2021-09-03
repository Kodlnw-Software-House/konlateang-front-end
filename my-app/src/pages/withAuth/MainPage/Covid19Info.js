const CovidInfo = (props) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 justify-items-stretch">
      <div className="shadow overflow-hidden stats col-span-2 ">
        <div className="stat bg-secondary bg-opacity-50">
          <div className="stat-title">ผู้ป่วยใหม่วันนี้</div>
          <div className="stat-value text-primary">
            {props.newCase.toLocaleString() + " "}
            <span className="font-light text-xl">ราย</span>
          </div>
          <span className="font-normal text-base stat-desc">
            *ข้อมูล ณ วันที่ {props.updateDate} น.
          </span>
        </div>
      </div>
      <div className="shadow overflow-hidden stats">
        <div className="stat bg-green-200">
          <div className="stat-title">กลับบ้านวันนี้</div>
          <div className="stat-value text-success">
            {props.newRecovered.toLocaleString() + " "}
            <span className="font-light text-xl">ราย</span>
          </div>
        </div>
      </div>
      <div className="shadow overflow-hidden stats">
        <div className="stat bg-green-200">
          <div className="stat-title">กลับบ้านสะสม</div>
          <div className="stat-value text-2xl md:text-4xl text-success">
            {props.totalRecovered.toLocaleString() + " "}
            <span className="font-light text-xl">ราย</span>
          </div>
        </div>
      </div>
      <div className="shadow overflow-hidden stats">
        <div className="stat bg-red-300">
          <div className="stat-title">เสียชีวิตวันนี้</div>
          <div className="stat-value text-error">
            {props.newDeath.toLocaleString() + " "}
            <span className="font-light text-xl">ราย</span>
          </div>
        </div>
      </div>
      <div className="shadow overflow-hidden stats">
        <div className="stat bg-gray-300">
          <div className="stat-title">เสียชีวิตสะสม</div>
          <div className="stat-value">
            {props.totalDeath.toLocaleString() + " "}
            <span className="font-light text-xl">ราย</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CovidInfo;
