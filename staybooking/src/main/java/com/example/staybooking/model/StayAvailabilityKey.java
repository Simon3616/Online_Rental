package com.example.staybooking.model;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@Embeddable  //声明成一个组合键
public class StayAvailabilityKey implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long stay_id;
    private LocalDate date;


    public StayAvailabilityKey() {}  // hibernate 使用过程中会创建一些实例，此时调用此构造函数

    public StayAvailabilityKey(Long stay_id, LocalDate date) {
        this.stay_id = stay_id;
        this.date = date;
    }

    public Long getStay_id() {
        return stay_id;
    }

    public StayAvailabilityKey setStay_id(Long stay_id) {
        this.stay_id = stay_id;
        return this;
    }

    public LocalDate getDate() {
        return date;
    }

    public StayAvailabilityKey setDate(LocalDate date) {
        this.date = date;
        return this;
    }
    @Override
    public boolean equals(Object o) { //作为primary key存在时 会经常被用作搜寻条件
        if (this == o) return true;   //会有等于参与
        if (o == null || getClass() != o.getClass()) return false;
        StayAvailabilityKey that = (StayAvailabilityKey) o;
        return stay_id.equals(that.stay_id) && date.equals(that.date);
    }

    @Override
    public int hashCode() { //返回一个系列state id ，最后放在一个MAP 里返回，判断是不是相同
        return Objects.hash(stay_id, date);
    }

}
