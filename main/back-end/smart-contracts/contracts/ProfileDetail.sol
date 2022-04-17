// SPDX-License-Identifier: MIT
pragma solidity >=0.6.6;

contract ProfileDetail {
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
        uint256 personId;
    }

    struct ReviewGiven {
        uint256 id;
        uint256 score;
        string content;
        string toPerson;
        uint256 personId;
    }

    mapping(uint256 => ReceivedReview) public receivedReviews;

    mapping(uint256 => ReviewGiven) public reviewGivens;

    event ReviewReceivedCreated(
        uint256 id,
        uint256 score,
        string content,
        string fromPerson,
        uint256 personId
    );

    event ReviewCreated(
        uint256 id,
        uint256 score,
        string content,
        string fromPerson,
        uint256 personId
    );

    constructor(address _ownerAddress) public {
        ownerAddress = _ownerAddress;
        // createRating(5, "My very first review");
        createReview(5, "My very first review", "Duc Anh", 1);
    }

    function createReviewReceived(
        uint256 _score,
        string memory _content,
        string memory _fromPerson,
        uint256 _personId
    ) public {
        reviewReceivedCount++;
        receivedReviews[reviewReceivedCount] = ReceivedReview(
            reviewReceivedCount,
            _score,
            _content,
            _fromPerson,
            _personId
        );
        emit ReviewReceivedCreated(
            reviewReceivedCount,
            _score,
            _content,
            _fromPerson,
            _personId
        );

        //Calculate Score for the profile
        totalScore += _score;
        displayScore = totalScore / reviewReceivedCount;
    }

    function createReview(
        uint256 _score,
        string memory _content,
        string memory _fromPerson,
        uint256 _personId
    ) public {
        reviewGivenCount++;
        reviewGivens[reviewGivenCount] = ReviewGiven(
            reviewGivenCount,
            _score,
            _content,
            _fromPerson,
            _personId
        );

        emit ReviewCreated(
            reviewGivenCount,
            _score,
            _content,
            _fromPerson,
            _personId
        );
    }
}
