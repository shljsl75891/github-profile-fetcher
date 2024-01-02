// url of Github API
const GITHUB_API = "https://api.github.com/users/";

// Selecting DOM elements
const githubUsernameInput = document.getElementById(
  "github-username-input",
) as HTMLInputElement;
const fetchDetailsBtn = document.querySelector(
  ".fetch-github-profile-details-btn",
) as HTMLButtonElement;
const mainGithubDisplayContainer = document.querySelector(
  ".github-profile-content",
) as HTMLDivElement;

mainGithubDisplayContainer.style.display = "none";

// fetching user details from Github API
async function fetchGtbDetails(
  username: string,
): Promise<Record<string, any> | undefined> {
  try {
    const response = await fetch(GITHUB_API + username);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error(err);
  }
}

function appendUserInfoProps(
  list: HTMLUListElement,
  data: Record<string, any>,
) {
  const followers = document.createElement("li");
  followers.innerHTML = `<strong>Followers:</strong> ${data?.followers}`;
  const following = document.createElement("li");
  following.innerHTML = `<strong>Following:</strong> ${data?.following}`;
  const location = document.createElement("li");
  location.innerHTML = `<strong>Location:</strong> ${data?.location}`;
  const createdAt = document.createElement("li");
  createdAt.innerHTML = `<strong>Created At:</strong> ${new Date(
    data?.created_at,
  ).toLocaleDateString()}`;
  const updatedAt = document.createElement("li");
  updatedAt.innerHTML = `<strong>Updated At:</strong> ${new Date(
    data?.updated_at,
  ).toLocaleDateString()}`;
  const linkToProfile = document.createElement("li");
  linkToProfile.innerHTML = `<a href="${data?.html_url}" target="_blank">${"Go to Profile"}</a>`;
  list.appendChild(followers);
  list.appendChild(following);
  list.appendChild(location);
  list.appendChild(createdAt);
  list.appendChild(updatedAt);
  list.appendChild(linkToProfile);
}

function showGtbProfileDetails(profileData: Record<string, any>) {
  mainGithubDisplayContainer.innerHTML = "";

  // appending user info
  const userInfoContainer = document.createElement("div");
  const userDisplayName = document.createElement("h2");
  const userInfoList = document.createElement("ul");
  userInfoList.className = "user-profile-props";
  userDisplayName.innerText = profileData?.name;
  appendUserInfoProps(userInfoList, profileData);
  userInfoContainer.appendChild(userDisplayName);
  userInfoContainer.appendChild(userInfoList);
  mainGithubDisplayContainer.appendChild(userInfoContainer);

  // appending user avatar
  const userAvatar = document.createElement("img");
  userAvatar.className = "github-user-avatar";
  userAvatar.src = profileData?.avatar_url;
  userAvatar.alt = `${profileData?.login}-avatar`;
  mainGithubDisplayContainer.appendChild(userAvatar);
}

const handleFetchGithubDetails = async () => {
  const profileData = await fetchGtbDetails(githubUsernameInput.value);
  if (profileData) {
    mainGithubDisplayContainer.style.display = "flex";
    showGtbProfileDetails(profileData);
  }
  githubUsernameInput.value = "";
};

githubUsernameInput.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") handleFetchGithubDetails();
});
fetchDetailsBtn?.addEventListener("click", handleFetchGithubDetails);
