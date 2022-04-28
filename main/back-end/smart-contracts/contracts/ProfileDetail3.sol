// SPDX-License-Identifier: MIT
pragma solidity >=0.6.6;

contract ProfileDetail3 {
    uint256 public totalScore = 0;
    uint256 public displayScore = 0;
    uint256 public reviewReceivedCount = 0;
    uint256 public reviewGivenCount = 0;
    address public ownerAddress;

    struct ReceivedReview {
        uint256 id;
        uint256 score;
        string content;
        string fromPerson;
        string personType;
        uint256 personId;
    }

    struct ReviewGiven {
        uint256 id;
        uint256 score;
        string content;
        string toPerson;
        string personType;
        uint256 personId;
    }

    mapping(uint256 => ReceivedReview) public receivedReviews;

    mapping(uint256 => ReviewGiven) public reviewGivens;

    event ReviewReceivedCreated(
        uint256 id,
        uint256 score,
        string content,
        string fromPerson,
        string personType,
        uint256 personId
    );

    event ReviewCreated(
        uint256 id,
        uint256 score,
        string content,
        string toPerson,
        string personType,
        uint256 personId
    );

    constructor(address _ownerAddress) public {
        createReview(5, "My very first review", "Duc Anh", "Business", 1);
        createReview(2, "My very second review", "Escanor", "Business", 2);
        createReview(2, "My very fourth review", "Astro", "Customer", 4);
        createReview(1, "My very fifth review", "Giga LTC", "Business", 5);
        ownerAddress = _ownerAddress;
    }

    function createReviewReceived(
        uint256 _score,
        string memory _content,
        string memory _fromPerson,
        string memory _personType,
        uint256 _personId
    ) public {
        reviewReceivedCount++;
        receivedReviews[reviewReceivedCount] = ReceivedReview(
            reviewReceivedCount,
            _score,
            _content,
            _fromPerson,
            _personType,
            _personId
        );
        emit ReviewReceivedCreated(
            reviewReceivedCount,
            _score,
            _content,
            _fromPerson,
            _personType,
            _personId
        );

        //Calculate Score for the profile
        totalScore += _score;
        displayScore = totalScore / reviewReceivedCount;
    }

    function createReview(
        uint256 _score,
        string memory _content,
        string memory _toPerson,
        string memory _personType,
        uint256 _personId
    ) public {
        reviewGivenCount++;
        reviewGivens[reviewGivenCount] = ReviewGiven(
            reviewGivenCount,
            _score,
            _content,
            _toPerson,
            _personType,
            _personId
        );

        emit ReviewCreated(
            reviewGivenCount,
            _score,
            _content,
            _toPerson,
            _personType,
            _personId
        );
    }
}
