﻿using BusBooking.Core.Model;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BusBooking.Core.Dto
{
    public class BookingCreateDto
    {
        public int ScheduleId { get; set; }
        public int SeatId { get; set; }
        public string PassengerName { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
    }

    public class BookingUpdateDto 
    {
        public int BookingId { get; set; }
        public string UserId { get; set; }
        public int ScheduleId { get; set; }
        public int SeatId { get; set; }
        public string PassengerName { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public BookingStatus Status { get; set; }
        public DateTime ApprovedDate { get; set; }
        public DateTime RejectedDate { get; set; }

        public DateTime BookingDate { get; set; }
        public string BookedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class BookingReadDto
    {
        public int BookingId { get; set; }
        public string UserId { get; set; }
        public int ScheduleId { get; set; }
        public int SeatId { get; set; }
        public string PassengerName { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public BookingStatus Status { get; set; }
        public DateTime ApprovedDate { get; set; }
        public DateTime RejectedDate { get; set; }

        public DateTime BookingDate { get; set; }
        public string BookedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsDeleted { get; set; }
    }
}