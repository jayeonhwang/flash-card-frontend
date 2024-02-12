import { LogoutLink } from "./authentication/LogoutLink"

export function Header() {

  let loggedInStatus;
  if (localStorage.jwt) {
    loggedInStatus = (
      <ul>
        <li><a href="/my">MY Page</a></li>
        <li><LogoutLink /></li>
      </ul>
    )
  } else {
    loggedInStatus = (
      <ul>
        <li><a href="/signup">Sign Up</a></li>
        <li><a href="/login">Log In</a></li>
      </ul>
    )
  }
  return (
    <header>
      <nav className="nav">
        <div className="home">
          <span className="icon">&#128451;</span>
          <a href="/"> FlashCards</a>
        </div>
        <div className="logstatus">
          {loggedInStatus}
        </div>
      </nav>
    </header>
  )
}