export const GetInitialsFromUserObject = (userObject) => {
    let userName = userObject?.userName;
    let split = userName.split(" ");
    if (split.length === 2) {
        let initials = `${split[0].split("")[0]}${split[1].split("")[0]}`;
        return initials;
    }
    if (split.length === 1) {
        let initials = `${split[0].split("")[0]}`;
        return initials;
    }
};