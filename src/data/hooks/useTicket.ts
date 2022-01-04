import { useContext } from "react";
import TicketContext from "../context/TicketContext";

const useTicket = () => useContext(TicketContext)

export default useTicket