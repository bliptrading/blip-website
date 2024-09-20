function AccountPage() {
  return (
    <div className="w-full h-full  p-2">
      <h1 className="font-roboto-thin text-2xl mb-6">Account Overview</h1>
      <form className="w-full  bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="firstName" className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter your first name"
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter your last name"
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="label">
            <span className="label-text">Address</span>
          </label>
          <textarea
            id="address"
            placeholder="Enter your address"
            rows={3}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter a new password (leave blank to keep current)"
            className="input input-bordered w-full"
          />
        </div>

        {/* Update Account Button */}
        <button
          type="submit"
          className="
              bg-red-500 
              p-4 
              text-lg 
              text-white 
              hover:bg-red-400 
              w-full 
              mt-4 rounded-lg transition duration-200 ease-in-out
           "
        >
          Update Account
        </button>
      </form>
    </div>
  );
}

export default AccountPage;
