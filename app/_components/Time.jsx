"use client"

export const Time = ({ datetime }) => {
    return new Date(datetime)?.toLocaleTimeString() || <></>
}

export const FormattedDate = ({ datetime }) => {
    return new Date(datetime).toLocaleDateString("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "long",
    }) || <></>
}