/*id
CARD_NAME

fee
    foreign-transaction-fee
    late fee
    balance transfer fee
    cash advance fee

SIGNUPBONUS
    SIGNUPBONUS payout
    SIGNUPBONUS spend
    SIGNUPBONUS timeline

annual fee

rewardstype
rewards expiration

rewards
    grocery percent
    gas percent
    dining percent
    travel percent
    other percent
    normal percent

apr
    intro apr
    intro apr duration
    low apr
    high apr
    balance transfer apr


promotions

benefits
*/

var params = {
  TableName: "CREDITCARDS",
  Item: {
    CARDID: "001",
    CARD_NAME: "Chase Freedom Unlimited",
    FEES: {
      FTF: "3%",
      LATE: "$39",
      BALANCE_TRANSFER_INTRO: { AMOUNT: "3%", DURATION: "60" },
      BALANCE_TRANSFER: { AMOUNT: "5%" },
      CASH_ADVANCE: { AMOUNT: "10%" },
    },
    SIGNUPBONUS: {
      AMOUNT: "200",
      SPEND: "500",
      TIMELINE: "3",
    },
    ANNUAL_FEE: "0",
    REWARDS: {
      TYPE: "Cash",
      EXPIRATION: "None",
      GROCERY: "1.5",
      DINING: "1.5",
      TRAVEL: "1.5",
      GAS: "1.5",
      OTHER: "1.5",
      NORMAL: "1.5",
    },
    APR: {
      INTRO_APR: "0",
      INTRO_APR_DURATION: "15",
      LOW_APR: "16.49",
      HIGH_APR: "25.24",
    },

    PROMOTIONS: null,

    BENEFITS: null,
  },
}

const Item = {
  CardID: "001",
  CARD_NAME: "Chase Freedom Unlimited",
  FEES: {
    FTF: "3%",
    LATE: "$39",
    BALANCE_TRANSFER_INTRO: { AMOUNT: "3%", DURATION: "60" },
    BALANCE_TRANSFER: { AMOUNT: "5%" },
    CASH_ADVANCE: { AMOUNT: "10%" },
  },
  SIGNUPBONUS: {
    AMOUNT: "200",
    SPEND: "500",
    TIMELINE: "3",
  },
  ANNUAL_FEE: "0",
  REWARDS: {
    TYPE: "Cash",
    EXPIRATION: "None",
    GROCERY: "1.5",
    DINING: "1.5",
    TRAVEL: "1.5",
    GAS: "1.5",
    OTHER: "1.5",
    NORMAL: "1.5",
  },
  APR: {
    INTRO_APR: "0",
    INTRO_APR_DURATION: "15",
    LOW_APR: "16.49",
    HIGH_APR: "25.24",
  },

  PROMOTIONS: null,

  BENEFITS: null,
}

/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
var AWS = require("aws-sdk")

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
})

var docClient = new AWS.DynamoDB.DocumentClient()

var params = {
  TableName: "CREDITCARDS",
  ProjectionExpression:
    "CARD_NAME, FEES, SIGNUPBONUS, ANNUAL_FEE, REWARDS, APR, PROMOTIONS, BENEFITS",
}

console.log("Scanning Movies table.")
docClient.scan(params, onScan)

function onScan(err, data) {
  if (err) {
    console.error(
      "Unable to scan the table. Error JSON:",
      JSON.stringify(err, null, 2)
    )
  } else {
    // print all the movies
    console.log("Scan succeeded.")
    data.Items.forEach(function(card) {
      console.log(card)
    })

    // continue scanning if we have more movies, because
    // scan can retrieve a maximum of 1MB of data
    if (typeof data.LastEvaluatedKey != "undefined") {
      console.log("Scanning for more...")
      params.ExclusiveStartKey = data.LastEvaluatedKey
      docClient.scan(params, onScan)
    }
  }
}
