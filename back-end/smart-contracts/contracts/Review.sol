// SPDX-License-Identifier: MIT
pragma solidity >=0.6.6;

contract Review {
    uint256 public reviewCount = 0;
    address public owner_address;

    struct Review {
        uint256 id;
        uint256 score;
        address person;
        string content;
    }

    mapping(uint256 => Review) public reviews;

    constructor(address _owner_address) public {
        owner_address = _owner_address;
        // createRating(_score, _person, _content);
    }

    function createRating(
        uint256 _score,
        address _person,
        string memory _content
    ) public {
        reviewCount++;
        reviews[reviewCount] = Review(reviewCount, _score, _person, _content);
    }

    function toggleCompleted(uint256 _id) public {}
}
