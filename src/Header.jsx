import { LogoutLink } from "./authentication/LogoutLink"

export function Header() {

  let loggedInStatus;
  if (localStorage.jwt) {
    loggedInStatus = (
      <>
        <a href="/my">MY Page</a> | <LogoutLink />
      </>
    )
  } else {
    loggedInStatus = (
      <>
        <a href="/signup">Sign Up</a> | <a href="/login">Log In</a>
      </>
    )
  }
  return (
    <header>
      <nav>
        <a href="/">Home</a> |  {loggedInStatus}
      </nav>
    </header>
  )
}