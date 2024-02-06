import { LogoutLink } from "./LogoutLink"

export function Header() {
  return (
    <header>
      <nav>
        <a href="/">Home</a> | <a href="/">Link</a> | <a href="/signup">Sign Up</a> |  <a href="/login">Log In</a> | <LogoutLink />
      </nav>
    </header>
  )
}