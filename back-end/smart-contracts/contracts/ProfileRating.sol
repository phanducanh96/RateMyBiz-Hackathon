// SPDX-License-Identifier: MIT
pragma solidity >=0.6.6;

contract ProfileRating {
    uint256 public ratingCount = 0;
    uint256 public totalScore = 0;
    address public owner_address;

    struct Rating {
        uint256 id;
        uint256 score;
        string content;
    }

    mapping(uint256 => Rating) public ratings;

    constructor(address _owner_address) public {
        owner_address = _owner_address;
        createRating(5, "My very first review");
    }

    function createRating(uint256 _score, string memory _content) public {
        ratingCount++;
        ratings[ratingCount] = Rating(ratingCount, _score, _content);
    }
}
