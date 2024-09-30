// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event Purchase(string item, uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw(_withdrawAmount);
    }

    // Function to buy handgloves
    function buyHandgloves(uint256 _amount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(balance >= _amount, "Insufficient balance to buy handgloves");

        uint _previousBalance = balance;
        balance -= _amount;

        // assert balance is correctly updated
        assert(balance == (_previousBalance - _amount));

        // emit the purchase event
        emit Purchase("Handgloves", _amount);
    }

    // Function to buy caps
    function buyCaps(uint256 _amount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(balance >= _amount, "Insufficient balance to buy caps");

        uint _previousBalance = balance;
        balance -= _amount;

        // assert balance is correctly updated
        assert(balance == (_previousBalance - _amount));

        // emit the purchase event
        emit Purchase("Caps", _amount);
    }

    // Function to buy socks
    function buySocks(uint256 _amount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(balance >= _amount, "Insufficient balance to buy socks");

        uint _previousBalance = balance;
        balance -= _amount;

        // assert balance is correctly updated
        assert(balance == (_previousBalance - _amount));

        // emit the purchase event
        emit Purchase("Socks", _amount);
    }
}
